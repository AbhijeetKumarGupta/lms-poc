import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enrollments/user/${userId}`);

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { message: error.message || 'Failed to fetch enrollments.' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: Any) {
    return NextResponse.json(
      { message: error.message || 'Unexpected server error.' },
      { status: 500 }
    );
  }
}
