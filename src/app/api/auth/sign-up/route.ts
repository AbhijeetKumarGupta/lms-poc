import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-up`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Signup failed.' },
        { status: response.status }
      );
    }

    const user = await response.json();
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Network error or server unavailable.' },
      { status: 500 }
    );
  }
}
