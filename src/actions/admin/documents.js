// src/app/admin/documents/actions.js

'use server'

import prisma from '@/db/client'

export async function updateDocumentStatus(documentId, status) {
  await prisma.document.update({
    where: { id: documentId },
    data: {
      status,
    },
  })
}
