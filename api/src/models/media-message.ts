import { randomUUID } from 'node:crypto'
import { Replace } from '../replace'

type MessageType = 'IMAGE' | 'AUDIO'

type Props = {
  url: string
  type: MessageType
  senderId: string
  recipientId: string
  createdAt: Date
}

export class MediaMessage {
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

  public get url(): string {
    return this.props.url
  }

  public set url(url: string) {
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

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
