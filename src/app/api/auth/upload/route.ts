import { getUploadAuthParams } from '@imagekit/next/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

    if (!privateKey || !publicKey) {
      return NextResponse.json(
        { message: 'ImageKit API keys are missing in environment variables.' },
        { status: 500 }
      );
    }

    const { token, expire, signature } = getUploadAuthParams({
      privateKey,
      publicKey,
      // Optional: customize these if needed
      // expire: 30 * 60,
      // token: 'optional-token-id',
    });

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey,
    });
  } catch (error: Any) {
    return NextResponse.json(
      { message: error.message || 'Failed to generate ImageKit auth parameters' },
      { status: 500 }
    );
  }
}
