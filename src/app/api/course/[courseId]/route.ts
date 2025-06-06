import { NextRequest, NextResponse } from 'next/server';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request, { params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Failed to fetch course data.' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: Any) {
    return NextResponse.json(
      { message: error.message || 'Server error or network issue.' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
  try {
    const body = await req.json();
    const { courseId } = await params;

    const res = await fetch(`${BASE_API_URL}/api/courses/${courseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { message: errorData.message || 'Failed to update course' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: Any) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
