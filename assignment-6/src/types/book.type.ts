export interface Book {
  author: string
  id: number
  name: string
  topic: {
    code: string
    id: number
    name: string
  }
}

export interface BookPayload {
  author: string
  name: string
  topicId: number
}
