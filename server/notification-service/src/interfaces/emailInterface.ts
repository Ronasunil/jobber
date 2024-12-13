export interface EmailLocals {
  sender?: string;
  appLink: string;
  appIcon: string;
  offerLink?: string;
  amount?: string;
  buyerUsername?: string;
  sellerUsername?: string;
  title?: string;
  description?: string;
  deliveryDays?: string;
  orderId?: string;
  orderDue?: string;
  requirements?: string;
  orderUrl?: string;
  originalDate?: string;
  newDate?: string;
  reason?: string;
  subject?: string;
  header?: string;
  type?: string;
  message?: string;
  serviceFee?: string;
  total?: string;
  username?: string;
  verifyLink?: string;
  resetLink?: string;
  otp?: string;
}

export interface EmailAuth {
  receiverEmail: string;
  username: string;
  verifyLink: string;
  resetLink: string;
  template: string;
}

export interface EmailOrder {
  receiverEmail: string;
  username: string;
  template: string;
  sender: string;
  offerLink: string;
  amount: string;
  buyerUsername: string;
  sellerUsername: string;
  title: string;
  description: string;
  deliveryDays: string;
  orderId: string;
  orderDue: string;
  requirements: string;
  orderUrl: string;
  originalDate: string;
  newDate: string;
  reason: string;
  subject: string;
  header: string;
  type: string;
  message: string;
  serviceFee: string;
  total: string;
}
