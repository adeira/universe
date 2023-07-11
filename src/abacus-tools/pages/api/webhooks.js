// @flow

// TODO:
// - [ ] add documentation for `ssh -R mrtnzlml:80:localhost:3000 serveo.net`

export default function handler(req: $FlowFixMe, res: $FlowFixMe) {
  if (req.method === 'POST') {
    // Process a POST request
    res.status(200).json(req.body);
  } else {
    // Handle any other HTTP method
    res.status(200).json(req.body);
  }
}
