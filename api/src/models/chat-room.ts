import { randomUUID } from 'node:crypto'
import { Replace } from '../replace'

type Props = {
  members: string[]
  createdAt: Date
}

export class ChatRoom {
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

  public get members(): string[] {
    return this.props.members
  }

  public set members(members: string[]) {
    this.props.members = members
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
