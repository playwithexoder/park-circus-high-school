import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real application, you would save this data to a database here.
    // e.g., await supabase.from('applications').insert([data])
    
    console.log('Received Application Data:', data);

    // Generate a mock application ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const applicationId = `PCHS-26-${randomNum}`;

    return NextResponse.json({ 
      success: true, 
      applicationId,
      message: 'Application received successfully.'
    });
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process application' },
      { status: 500 }
    );
  }
}
