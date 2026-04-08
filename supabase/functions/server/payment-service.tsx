import * as kv from './kv_store.tsx';

export type PaymentMethod = 'mobile_money' | 'debit_card' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Payment {
  id: string;
  application_id: string;
  user_id: string;
  amount_usd: number;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  transaction_reference?: string;
  receipt_url?: string;
  paid_at?: string;
  created_at: string;
}

export async function createPayment(paymentData: {
  application_id: string;
  user_id: string;
  amount_usd: number;
  payment_method: PaymentMethod;
}) {
  try {
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    const payment: Payment = {
      id,
      application_id: paymentData.application_id,
      user_id: paymentData.user_id,
      amount_usd: paymentData.amount_usd,
      payment_method: paymentData.payment_method,
      status: 'pending',
      transaction_reference: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      created_at: timestamp,
    };

    await kv.set(`payment:${id}`, payment);
    await kv.set(`payment:application:${paymentData.application_id}`, id);
    
    // Add to user's payment list
    const userPayments = await kv.get<string[]>(`user:${paymentData.user_id}:payments`) || [];
    userPayments.push(id);
    await kv.set(`user:${paymentData.user_id}:payments`, userPayments);

    return payment;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}

export async function getPayment(paymentId: string) {
  try {
    const payment = await kv.get<Payment>(`payment:${paymentId}`);
    return payment;
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw error;
  }
}

export async function getPaymentByApplicationId(applicationId: string) {
  try {
    const paymentId = await kv.get<string>(`payment:application:${applicationId}`);
    if (!paymentId) {
      return null;
    }
    const payment = await kv.get<Payment>(`payment:${paymentId}`);
    return payment;
  } catch (error) {
    console.error('Error fetching payment by application ID:', error);
    throw error;
  }
}

export async function updatePaymentStatus(
  paymentId: string,
  status: PaymentStatus,
  receiptUrl?: string
) {
  try {
    const payment = await kv.get<Payment>(`payment:${paymentId}`);
    if (!payment) {
      throw new Error('Payment not found');
    }

    const updatedPayment: Payment = {
      ...payment,
      status,
      receipt_url: receiptUrl || payment.receipt_url,
      paid_at: status === 'completed' ? new Date().toISOString() : payment.paid_at,
    };

    await kv.set(`payment:${paymentId}`, updatedPayment);
    return updatedPayment;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
}

export async function processPayment(paymentId: string, paymentDetails: {
  transaction_reference?: string;
  receipt_url?: string;
}) {
  try {
    const payment = await kv.get<Payment>(`payment:${paymentId}`);
    if (!payment) {
      throw new Error('Payment not found');
    }

    // Simulate payment processing
    // In production, this would integrate with actual payment gateways like:
    // - TNM Mpamba
    // - Airtel Money
    // - Standard Bank
    // - Stripe, etc.

    const updatedPayment: Payment = {
      ...payment,
      status: 'completed',
      transaction_reference: paymentDetails.transaction_reference || payment.transaction_reference,
      receipt_url: paymentDetails.receipt_url,
      paid_at: new Date().toISOString(),
    };

    await kv.set(`payment:${paymentId}`, updatedPayment);

    return updatedPayment;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
}

export async function getUserPayments(userId: string) {
  try {
    const paymentIds = await kv.get<string[]>(`user:${userId}:payments`) || [];
    const payments = await Promise.all(
      paymentIds.map(id => kv.get<Payment>(`payment:${id}`))
    );
    return payments.filter(payment => payment !== null);
  } catch (error) {
    console.error('Error fetching user payments:', error);
    throw error;
  }
}
