import { UniqueID } from "./unique-id";

type DomainEventMetadata = {
  /** Whern this domain event occurred */
  readonly timestamp: number;

  /** ID for correlation purposes (for Integration Events with other domains).
   */
  readonly correlationId: string;
};

export type DomainEventProps<T> = Omit<T, "id" | "metadata"> & {
  aggregateId: string;
  metadata?: DomainEventMetadata;
};

export abstract class DomainEvent {
  public readonly id: string;

  public readonly aggregateId: string;

  public readonly metadata: DomainEventMetadata;

  constructor(props: DomainEventProps<unknown>) {
    const uniqueId = new UniqueID();
    this.id = uniqueId.toString();
    this.aggregateId = props.aggregateId;
    this.metadata = {
      correlationId: props?.metadata?.correlationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
    };
  }
}
