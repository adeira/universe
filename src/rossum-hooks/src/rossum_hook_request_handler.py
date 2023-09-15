"""
This custom function example can be used for showing custom messages to the
user on the validation screen or for updating values of specific fields.
(annotation_content event and user_update action which provides annotation
content tree as an input). The function below shows how to:
1. Display a warning message to the user if "item_amount_base" field of
a line item exceeds a predefined threshold
2. Removes all dashes from the "document_id" field

item_amount_base and document_id should be fields defined in a schema.

You can use some external libraries in your custom functions. List of supported
libraries can be found at https://elis.rossum.ai/api/docs/#third-party-libraries

More about custom functions - https://developers.rossum.ai/docs/how-to-use-serverless-functions
"""

# it is possible to import modules from standard Python library
from traceback import format_exc


def rossum_hook_request_handler(payload):
    """
    The rossum_hook_request_handler is an obligatory main function that accepts
    input and produces output of the rossum custom function hook.
    :param payload: see https://elis.rossum.ai/api/docs/#annotation-content-event-data-format
    :return: messages and operations that update the annotation content or show messages
    """
    messages = []
    operations = []

    if payload["event"] == "annotation_content" and payload["action"] == "user_update":

        try:
            messages, operations = example_main_function(payload)

        except MessageException as msg:
            messages = [
                create_message(msg.message_type, msg.message_content, msg.datapoint_id)
            ]

        except Exception as e:
            # stack traces can be printed to console for debugging - these prints will not
            # be visible to the user when the function runs on a document in queue
            print(format_exc())
            messages = [create_message("error", "Serverless Function: " + str(e))]

    return {"messages": messages, "operations": operations}


def example_main_function(payload):
    """
    Main function that implements custom logic on datapoints.
    :param payload: see https://elis.rossum.ai/api/docs/#annotation-content-event-data-format
    :return: tuple - messages and operations to be returned from the hook
    """

    messages = []
    operations = []

    content = payload["annotation"]["content"]

    # Values over the threshold trigger a warning message
    TOO_BIG_THRESHOLD = 1000000

    # List of all datapoints of item_amount_base schema id
    amount_base_column_datapoints = find_by_schema_id(content, "item_amount_base")

    if amount_base_column_datapoints == []:
        # Raise MessageException to terminate function flow and display a message to the user
        raise MessageException("warning", "No item_amount_base datapoints found")

    for amount_base_column_datapoint in amount_base_column_datapoints:

        # Use normalized_value for comparing values of
        # Date and Number fields (https://elis.rossum.ai/api/docs/#content-object)
        value = float(amount_base_column_datapoint["content"]["normalized_value"] or 0)
        if value >= TOO_BIG_THRESHOLD:
            messages.append(
                create_message(
                    "warning", "Value is too big", amount_base_column_datapoint["id"]
                )
            )

    # There should be only one datapoint with schema id "document_id"
    document_id_datapoint = find_by_schema_id(content, "document_id")[0]

    if document_id_datapoint:
        document_id = document_id_datapoint["content"]["value"]
        # Use print for debugging - only visible in the console (Output > Log), not to the user
        print(f'Adding operation to remove dashes from "{document_id}"')
        operations.append(
            create_replace_operation(
                document_id_datapoint, document_id.replace("-", "")
            )
        )

    return messages, operations


def find_by_schema_id(content, schema_id: str):
    """
    Return all datapoints matching a schema id.
    :param content: annotation content tree (see https://elis.rossum.ai/api/docs/#annotation-data)
    :param schema_id: field's ID as defined in the extraction schema(see https://elis.rossum.ai/api/docs/#document-schema)
    :return: the list of datapoints matching the schema ID
    """
    accumulator = []
    for node in content:
        if node["schema_id"] == schema_id:
            accumulator.append(node)
        elif "children" in node:
            accumulator.extend(find_by_schema_id(node["children"], schema_id))

    return accumulator


def create_message(message_type, message_content, datapoint_id=None):
    """
    Create a message which will be shown to the user
    :param message_type: type of the message, any of {info|warning|error}. Errors prevent confirmation in the UI.
    :param message_content: message shown to the user
    :param datapoint_id: id of the datapoint where the message will appear (None for "global" messages).
    :return: dict with the message definition (see https://elis.rossum.ai/api/docs/#annotation-content-event-response-format)
    """
    return {
        "content": message_content,
        "type": message_type,
        "id": datapoint_id,
    }


def create_replace_operation(datapoint, new_value):
    """
    Replace the value of the datapoint with a new value.
    :param datapoint: content of the datapoint
    :param new_value: new value of the datapoint
    :return: dict with replace operation definition (see https://elis.rossum.ai/api/docs/#annotation-content-event-response-format)
    """
    return {
        "op": "replace",
        "id": datapoint["id"],
        "value": {
            "content": {
                "value": new_value,
            },
        },
    }


class MessageException(Exception):
    """
    Exception raised when a message should be displayed to the user (e.g. missing field in schema).
    """

    def __init__(
        self, message_type: str, message_content: str, datapoint_id: int = None
    ):
        """
        :param message_type: type of the message - info, warning or error
        :param message_content: content of the message
        :param datapoint_id: id of the datapoint to which the message relates (None for "global" messages)
        """
        self.message_type = message_type
        self.message_content = message_content
        self.datapoint_id = datapoint_id
