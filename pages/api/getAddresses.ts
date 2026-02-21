import type { NextApiRequest, NextApiResponse } from 'next';
import generateMockAddresses from '../../src/utils/generateMockAddresses';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { postcode, streetnumber },
  } = req;

  if (!postcode || !streetnumber) {
    return res.status(400).send({
      status: 'error',
      // DO NOT MODIFY MSG - used for grading
      errormessage: 'Postcode and street number fields mandatory!',
    });
  }

  if (postcode.length < 4) {
    return res.status(400).send({
      status: 'error',
      errormessage: 'Postcode must be at least 4 digits!',
    });
  }

  const isStrictlyNumeric = (value: string) => /^\d+$/.test(value);

  const fields = [
    { value: postcode as string, msg: 'Postcode must be all digits and non negative!' },
    { value: streetnumber as string, msg: 'Street Number must be all digits and non negative!' },
  ];

  for (const field of fields) {
    if (!isStrictlyNumeric(field.value)) {
      return res.status(400).send({
        status: 'error',
        errormessage: field.msg,
      });
    }
  }

  const mockAddresses = generateMockAddresses(postcode as string, streetnumber as string);

  if (mockAddresses) {
    const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await timeout(500);
    return res.status(200).json({
      status: 'ok',
      details: mockAddresses,
    });
  }

  return res.status(404).json({
    status: 'error',
    // DO NOT MODIFY MSG - used for grading
    errormessage: 'No results found!',
  });
}
