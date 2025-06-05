import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`);
    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { message: errorData.message || 'Failed to fetch courses' },
        { status: res.status }
      );
    }
    const courses = await res.json();
    return NextResponse.json(courses);
  } catch (error: Any) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { message: errorData.message || 'Failed to create course' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: Any) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
