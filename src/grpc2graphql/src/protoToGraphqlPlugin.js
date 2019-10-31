// @flow

import {
  CodeGeneratorRequest,
  CodeGeneratorResponse,
} from 'google-protobuf/google/protobuf/compiler/plugin_pb';

const parse = (buffer: Buffer) => {
  const fileNameToDescriptor = {};

  const typedInputBuff = new Uint8Array(buffer.length);
  typedInputBuff.set(buffer);

  const codeGenRequest = CodeGeneratorRequest.deserializeBinary(typedInputBuff);
  const codeGenResponse = new CodeGeneratorResponse();

  codeGenRequest.getProtoFileList().forEach(protoFileDescriptor => {
    fileNameToDescriptor[protoFileDescriptor.getName()] = protoFileDescriptor;
  });

  codeGenRequest.getFileToGenerateList().forEach(fileName => {
    const thisFileFlow = new CodeGeneratorResponse.File();
    thisFileFlow.setName(`${fileName}.lol.js`);
    thisFileFlow.setContent('console.log("lol")');
    codeGenResponse.addFile(thisFileFlow);
  });
  process.stdout.write(Buffer.from(codeGenResponse.serializeBinary()));
};

let buff = Buffer.from('');

process.stdin.on('readable', () => {
  const readChunks = (chunk: ?(Buffer | string)) => {
    if (chunk instanceof Buffer) {
      buff = Buffer.concat([buff, chunk]);
      readChunks(process.stdin.read());
    }
  };

  readChunks(process.stdin.read());
});

process.stdin.on('end', () => {
  parse(buff);
});
