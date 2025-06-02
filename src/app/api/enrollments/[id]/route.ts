import { NextResponse } from 'next/server';

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enrollments/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Unenrollment failed.' },
        { status: response.status }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: Any) {
    return NextResponse.json(
      { message: error.message || 'Server error or network issue.' },
      { status: 500 }
    );
  }
}
