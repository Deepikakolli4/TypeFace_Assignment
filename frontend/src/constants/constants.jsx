export const urls = {
  login: '/users/login',
  register: '/users/register',
  create: '/transactions/create',
  get: '/transactions',
  delete: (id) => `/transactions/${id}`,
  summary: '/transactions/summary',
  receiptUpload: '/transactions/receipt-upload',
  pdfUpload: '/transactions/pdf-upload',
};
