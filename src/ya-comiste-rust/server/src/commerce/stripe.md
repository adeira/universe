The following entities follow Stripe descriptions because they seem to be designed well. Stripe deprecated the Orders API so we have to handle the order process partially on the server (Stripe handles only the payment process), however, the concepts are still valid.

See:

- https://stripe.com/docs/api?lang=node
- https://stripe.com/docs/orders/guide#best-practices

## Product

Products describe the specific goods or services you offer to your customers. For example, you might offer a Standard and Premium version of your goods or service; each version would be a separate Product. They can be used in conjunction with [Prices](#price) to configure pricing.

```json
{
  "id": "prod_IespdG7I0lYsar",
  "object": "product",
  "active": true,
  "attributes": ["size", "gender"],
  "created": 1609213163,
  "description": "Comfortable gray cotton t-shirt",
  "images": [],
  "livemode": false,
  "metadata": {},
  "name": "T-shirt",
  "statement_descriptor": null,
  "unit_label": null,
  "updated": 1609213163
}
```

## Price

Prices define the unit cost, currency, and (optional) billing cycle for both recurring and one-time purchases of products. [Products](#product) help you track inventory or provisioning, and prices help you track payment terms. Different physical goods or levels of service should be represented by products, and pricing options should be represented by prices. This approach lets you change prices without having to change your provisioning scheme.

```json
{
  "id": "price_1I3Z3OBHWpkjRuwwHzkQJttH",
  "object": "price",
  "active": true,
  "billing_scheme": "per_unit",
  "created": 1609213162,
  "currency": "mxn",
  "livemode": false,
  "lookup_key": null,
  "metadata": {},
  "nickname": null,
  "product": "prod_HKLDuG2oQ26YGo",
  "recurring": {
    "aggregate_usage": null,
    "interval": "month",
    "interval_count": 1,
    "usage_type": "licensed"
  },
  "tiers_mode": null,
  "transform_quantity": null,
  "type": "recurring",
  "unit_amount": 2000,
  "unit_amount_decimal": "2000"
}
```

## Order

_deprecated on Stripe_

Order objects are created to handle end customers' purchases of previously defined [products](#product). You can create, retrieve, and pay individual orders, as well as list all orders. Orders are identified by a unique, random ID.

```json
{
  "id": "or_1I3Z3OIHqwQFdWEmNtQUBMFW",
  "object": "order",
  "amount": 1500,
  "amount_returned": null,
  "application": null,
  "application_fee": null,
  "charge": null,
  "created": 1609213162,
  "currency": "mxn",
  "customer": null,
  "email": null,
  "items": [
    {
      "object": "order_item",
      "amount": 1500,
      "currency": "mxn",
      "description": "T-shirt",
      "parent": "sk_1I3VmeIHqwQFdWEmz2vFxSOf",
      "quantity": null,
      "type": "sku"
    }
  ],
  "livemode": false,
  "metadata": {},
  "returns": {
    "object": "list",
    "data": [],
    "has_more": false,
    "url": "/v1/order_returns?order=or_1I3Z3OIHqwQFdWEmNtQUBMFW"
  },
  "selected_shipping_method": null,
  "shipping": {
    "address": {
      "city": "San Francisco",
      "country": "US",
      "line1": "1234 Fake Street",
      "line2": null,
      "postal_code": "94102",
      "state": null
    },
    "carrier": null,
    "name": "Jenny Rosen",
    "phone": null,
    "tracking_number": null
  },
  "shipping_methods": null,
  "status": "created",
  "status_transitions": {
    "canceled": null,
    "fulfiled": null,
    "paid": null,
    "returned": null
  },
  "updated": 1609213162
}
```

## Order Item

A representation of the constituent items of any given order. Can be used to represent [SKUs](#sku-stock-keeping-unithttpenwikipediaorgwikistock_keeping_unit), shipping costs, or taxes owed on the order.

```json
{
  "object": "order_item",
  "amount": 1500,
  "currency": "mxn",
  "description": "T-shirt",
  "parent": "sk_1I3VmeIHqwQFdWEmz2vFxSOf",
  "quantity": null,
  "type": "sku"
}
```

## SKU ([Stock Keeping Unit](http://en.wikipedia.org/wiki/Stock_keeping_unit))

Stores representations of stock keeping units. SKUs describe specific product variations, taking into account any combination of: attributes, currency, and cost. For example, a product may be a T-shirt, whereas a specific SKU represents the `size: large`, `color: red` version of that shirt.

Can also be used to manage inventory.

```json
{
  "id": "sku_IespK7wY1kLz8J",
  "object": "sku",
  "active": true,
  "attributes": {
    "size": "Medium",
    "gender": "Unisex"
  },
  "created": 1609213161,
  "currency": "mxn",
  "image": null,
  "inventory": {
    "quantity": 50,
    "type": "finite",
    "value": null
  },
  "livemode": false,
  "metadata": {},
  "package_dimensions": null,
  "price": 1500,
  "product": "prod_IespVnZlVM0mkl",
  "updated": 1609213161
}
```
