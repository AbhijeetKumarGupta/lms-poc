import { NextRequest, NextResponse } from 'next/server';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${BASE_API_URL}/api/progress`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || 'Failed to add progress' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error: Any) {
    console.log({ error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');

    const response = await fetch(`${BASE_API_URL}/api/progress/${userId}/${courseId}`);

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || 'Progress not found' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: Any) {
    console.log({ error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
