import { NextResponse } from 'next/server'
import fs from 'fs';
import path from 'path';
import { GENERATED_DATA_DIR } from '../constants';

type CatalogNumbersBySubjectArea = {
    [subjectArea: string]: string[]
}

export async function GET() {
    const subjectIndex = JSON.parse(await fs.promises.readFile(
        path.resolve(GENERATED_DATA_DIR, 'subject-index.json'), 'utf-8'
    ));

    const catalogNumbersBySubjectArea: CatalogNumbersBySubjectArea = {};
    const subjectAreas = Object.keys(subjectIndex);
    for (const subjectArea of subjectAreas) {
        const catalogNumbers = Object.keys(subjectIndex[subjectArea]);
        catalogNumbersBySubjectArea[subjectArea] = catalogNumbers;
    }

    return NextResponse.json(catalogNumbersBySubjectArea);
}