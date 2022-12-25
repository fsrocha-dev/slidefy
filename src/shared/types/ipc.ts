export interface Document {
  id: string
  title: string
  content?: string
}

/**
 * Request
 */
export interface SaveDocumentRequest extends Document {}

export interface FetchDocumentRequest {
  id: string
}

export interface DeleteDocumentRequest {
  id: string
}

/**
 * Response
 */

export interface FetchAllDocumentsResponse {
  data: Document[]
}

export interface FetchDocumentResponse {
  data: Document
}

export interface CreateDocumentResponse {
  data: Document
}
