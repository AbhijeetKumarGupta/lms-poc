import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enrollments`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Enrollment failed.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error: Any) {
    return NextResponse.json(
      { message: error.message || 'Server error or network issue.' },
      { status: 500 }
    );
  }
}
