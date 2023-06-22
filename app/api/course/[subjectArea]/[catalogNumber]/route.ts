import { NextResponse } from 'next/server'
import fs from 'fs';
import path from 'path';
import { GENERATED_DATA_DIR } from '../../../constants';

export async function GET(_: Request, { params }: { params: { subjectArea: string, catalogNumber: string } }) {
    const subjectIndex = JSON.parse(await fs.promises.readFile(
        path.resolve(GENERATED_DATA_DIR, 'subject-index.json'), 'utf-8'
    ));
    const { subjectArea, catalogNumber } = params;

    return NextResponse.json(subjectIndex[subjectArea.toUpperCase()][catalogNumber.toUpperCase()]);
}