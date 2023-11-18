import { randomUUID } from 'node:crypto'
import { Replace } from '../replace'

type Props = {
  content: string
  senderId: string
  recipientId: string
  createdAt: Date
}

export class TextMessage {
  private _id?: string
  private props: Props

  constructor(props: Replace<Props, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id(): string | undefined {
    return this._id
  }

  public get content(): string {
    return this.props.content
  }

  public set content(content: string) {
    this.props.content = content
  }

  public get senderId(): string {
    return this.props.senderId
  }

  public set senderId(senderId: string) {
    this.props.senderId = senderId
  }

  public get recipientId(): string {
    return this.props.recipientId
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
