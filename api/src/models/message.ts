import { randomUUID } from 'node:crypto'
import { Replace } from '../replace'

export type MessageType = 'TEXT' | 'IMAGE' | 'AUDIO'

type Props = {
  content: string
  url: string | null
  type: MessageType
  senderId: string
  recipientId: string
  roomId: string
  createdAt: Date
}

export class Message {
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

  public get url(): string | null {
    return this.props.url
  }

  public set url(url: string | null) {
    this.props.url = url
  }

  public get type(): MessageType {
    return this.props.type
  }

  public set type(type: MessageType) {
    this.props.type = type
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

  public get roomId(): string {
    return this.props.roomId
  }

  public set roomId(roomId: string) {
    this.props.roomId = roomId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
