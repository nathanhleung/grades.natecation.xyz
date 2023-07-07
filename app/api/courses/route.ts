import fs from 'fs';
import { mapValues, pick } from 'lodash';
import { NextResponse } from 'next/server';
import path from 'path';
import { GENERATED_DATA_DIR } from '../constants';

type CatalogNumbersBySubjectArea = {
    [subjectArea: string]: string[]
}

/**
 * TODO(nathanhleung): cache this route (and others that can be cached)
 */
export async function GET() {
    const subjectIndex = JSON.parse(await fs.promises.readFile(
        path.resolve(GENERATED_DATA_DIR, 'subject-index.json'), 'utf-8'
    ));

    const catalogNumbersBySubjectArea: CatalogNumbersBySubjectArea = {};
    const subjectAreas = Object.keys(subjectIndex);
    for (const subjectArea of subjectAreas) {
        catalogNumbersBySubjectArea[subjectArea] = mapValues(subjectIndex[subjectArea], (rows, key) => {
            return {
                ...pick(rows[0], 'courseTitle'),
                catalogNumber: key,
                nRows: rows.length,
            };
        });
    }

    return NextResponse.json(catalogNumbersBySubjectArea);
}