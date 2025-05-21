import clientPromise from '../../../utils/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ message: 'Unauthorized: No session found' });
  }

  const { transactionId, subscriptionDate } = req.body;

  if (!transactionId || !subscriptionDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('mttrader');

    const newSubscription = {
      email: session.user.email,
      transactionId,
      subscriptionDate,
      createdAt: new Date(),
      status: 'Success',
    };

    const result = await db.collection('subscriptions').insertOne(newSubscription);

    res.status(201).json({ message: 'Subscription added successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error adding subscription:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
