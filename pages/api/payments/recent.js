import clientPromise from '../../../utils/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user || !session.user.email) {
      return res.status(401).json({ message: 'Unauthorized: No session found' });
    }

    const userEmail = session.user.email;
    console.log('Session email:', userEmail);

    const client = await clientPromise;
    const db = client.db(); // default DB
    const collection = db.collection('subscriptions');

    // Debug: Show all matching documents
    const allUserSubscriptions = await collection.find({ email: userEmail }).toArray();
    console.log('All subscriptions for user:', allUserSubscriptions);

    // Query active subscription
    const subscription = await collection
      .find({ email: userEmail, status: 'active' })
      .sort({ subscriptionDate: -1 })
      .limit(1)
      .toArray();

    console.log('Filtered active subscription:', subscription);

    if (!subscription.length) {
      return res.status(404).json({ message: 'No active subscription found for user' });
    }

    res.status(200).json({
      id: subscription[0]._id,
      email: subscription[0].email,
      transactionId: subscription[0].transactionId,
      subscriptionDate: subscription[0].subscriptionDate,
      createdAt: subscription[0].createdAt,
      status: subscription[0].status,
    });

  } catch (err) {
    console.error('Error fetching recent subscription:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
