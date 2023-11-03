// This script downloads annotation data from the API and saves it to a CSV file.
// It primarily analyzes the confidence scores and automation blockers.
//
// Run it:
//
// ROSSUM_USER='XXXXX' ROSSUM_PASSWORD='YYYYY' node src/rossum-swat/src/analyze-confidence-scores
//

const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');

const user = process.env.ROSSUM_USER;
const password = process.env.ROSSUM_PASSWORD;

const queues = {
  CH: { id: '1588863', name: 'CH' },
  DE: { id: '1343470', name: 'DE' },
  DK: { id: '1343471', name: 'DK' },
  FR: { id: '1343472', name: 'FR' },
  IE: { id: '1345570', name: 'IE' },

  //
  GBC: { id: '1345635', name: 'GBC' },
};

const fieldsList = [
  'document_type',
  'document_id',
  'date_issue',
  'account_num',
  'bank_num',
  'iban',
  'bic',
  'var_sym',
  'amount_total_base',
  'amount_total_tax',
  'amount_due',
  'currency',
  'recipient_name',
  'sender_match',
  'sender_number_match',
  'sender_name',
  'sender_address',
  'sender_vat_id',
  'requestor',
];

function _fetch(...args) {
  console.log(args[0]);
  return fetch(...args);
}

function _findBySchemaId(content, schemaId) {
  function mergeResults(results, dp, schemaId) {
    if (dp.schema_id === schemaId) {
      return [...results, dp];
    }
    if (dp.children) {
      return [...results, ..._findBySchemaId(dp.children, schemaId)];
    }
    return results;
  }

  return content.reduce((results, dp) => mergeResults(results, dp, schemaId), []);
}

async function getAnnotations(token, domain, queue) {
  const headers = { Authorization: `Bearer ${token}` };
  let annotations = [];
  let nextUrl = `https://${domain}/api/v1/annotations?queue=${queue}`;

  while (nextUrl) {
    const response = await _fetch(nextUrl, { headers });
    const data = await response.json();
    annotations = annotations.concat(data.results);

    // TODO: quick hack to get only 1 page of annotations:
    // nextUrl = false;
    nextUrl = data.pagination.next;
  }

  return annotations;
}

async function getCleanedAnnotations(annotations, headers) {
  const cleanedAnnotations = [];
  let automationBlockerContent = null;

  for (const annotation of annotations) {
    if (annotation.automated === false) {
      automationBlockerContent = (
        await (await _fetch(annotation.automation_blocker, { headers })).json()
      ).content;
    } else {
      automationBlockerContent = null;
    }

    const contentResponse = await _fetch(annotation.content, { headers });
    const annotationContent = await contentResponse.json();

    function _find(schemaId) {
      return _findBySchemaId(annotationContent.results, schemaId)[0];
    }

    function _findValue(schemaId) {
      const dp = _find(schemaId);
      if (dp?.options != null) {
        return dp?.options.find((o) => o.value === dp?.content?.value)?.label ?? '-';
      }
      return dp?.content?.value ?? '-';
    }

    function _findScore(schemaId) {
      return _find(schemaId)?.content?.rir_confidence ?? '-';
    }

    function _findAutomationBlocker(schemaId) {
      if (automationBlockerContent != null) {
        const blocker = _findBySchemaId(automationBlockerContent, schemaId)[0];
        if (blocker) {
          return JSON.stringify(blocker);
        }
        return '';
      }
      return '';
    }

    const cleanedAnnotation = {
      url: annotation.url.replace('/api/v1/annotations/', '/document/'),
      pages: annotation.pages.length,
      automated: annotation.automated,
      status: annotation.status,
    };

    for (const field of fieldsList) {
      cleanedAnnotation[field] = _findValue(field);
      cleanedAnnotation[`${field}_score`] = _findScore(field);
      if (_find(field)?.options != null) {
        const optionsLen = _find(field)?.options?.length;
        cleanedAnnotation[`${field}_type`] = optionsLen > 1 ? `multiple_match` : 'single_match';
        if (optionsLen === 1 && _find(field)?.options[0].value === '') {
          cleanedAnnotation[`${field}_type`] = 'no_match';
        }
      }
      cleanedAnnotation[`${field}_blocker`] = _findAutomationBlocker(field);
    }

    for (const field of fieldsList) {
      // automation unblocker overwrites (value_existence):
      if (field === 'iban' && cleanedAnnotation.iban !== '') {
        cleanedAnnotation.bank_num_blocker = 'UNBLOCKED';
        cleanedAnnotation.bic_blocker = 'UNBLOCKED';
      }

      // automation unblocker overwrites (single_option):
      if (field === 'sender_number_match' && cleanedAnnotation.sender_number_match !== '') {
        const matchLength = _find('sender_number_match')?.options?.length;
        if (matchLength === 1) {
          cleanedAnnotation.sender_name_blocker = `UNBLOCKED`;
          cleanedAnnotation.sender_address_blocker = `UNBLOCKED`;
          cleanedAnnotation.sender_vat_id_blocker = `UNBLOCKED`;
        }
      }

      // detect duplicate_match based on: "duplicate match if the set(sender_match_number)==1"
      if (field === 'sender_number_match') {
        if (
          _find('sender_number_match')?.options?.length > 1 &&
          new Set(_find('sender_number_match')?.options.map((o) => o.label)).size === 1
        ) {
          cleanedAnnotation.sender_number_match_type = `duplicate_match`;
        }
      }
    }

    cleanedAnnotations.push(cleanedAnnotation);
  }

  return cleanedAnnotations;
}

async function writeAnnotationsToCSV(filename, annotations) {
  const csvWriter = createObjectCsvWriter({
    path: path.join(__dirname, filename),
    header: Object.keys(annotations[0])
      .filter((id) => {
        // remove `sender_number_match_blocker` for readability
        return id !== 'sender_number_match_blocker';
      })
      .map((id) => {
        return { id, title: id };
      }),
  });

  await csvWriter.writeRecords(annotations);
}

(async function () {
  const authResponse = await _fetch('https://elis.rossum.ai/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user, password }),
  });

  const { key: token, domain } = await authResponse.json();
  const headers = { Authorization: `Bearer ${token}` };

  const selectedQueue = queues.GBC;
  const annotations = await getAnnotations(token, domain, selectedQueue.id);
  const cleanedAnnotations = await getCleanedAnnotations(annotations, headers);
  await writeAnnotationsToCSV(`${selectedQueue.name}.csv`, cleanedAnnotations);
})();
