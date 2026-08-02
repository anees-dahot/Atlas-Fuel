import {handleFormSubmission} from '../_shared/formSubmission'

export async function POST(request) {
  return handleFormSubmission(request, 'contact')
}
