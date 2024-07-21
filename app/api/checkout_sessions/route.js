import { NextResponse } from "next/server";
import stripe from "stripe";

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { priceId, quantity, email } = await request.json();

    const session = await stripeClient.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      customer_email: email,
      mode: "payment",
      return_url: `${request.headers.get("origin")}/account/bookings`,
      locale: "en",
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    const session = await stripeClient.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details.email,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    { status: 200, headers: { Allow: "POST, GET" } }
  );
}
