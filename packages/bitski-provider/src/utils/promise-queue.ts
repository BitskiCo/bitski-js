interface PromiseQueueItem<T, Result> {
  item: T;
  cancel?: () => void;
  finished: boolean;
  resolve: (result: Result) => void;
  reject: (e: unknown) => void;
}

export class PromiseQueue<T, Result> {
  private queue: PromiseQueueItem<T, Result>[] = [];

  private currentItem?: PromiseQueueItem<T, Result>;

  constructor(private runItem: (details: T) => { result: Promise<Result>; cancel?: () => void }) {}

  push(item: T): Promise<Result> {
    let resolve, reject;
    const promise = new Promise<Result>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    this.queue.push({
      item,
      resolve,
      reject,
      cancel: undefined,
      finished: false,
    });

    if (!this.currentItem) {
      this.runNextItem();
    }

    return promise;
  }

  cancel(item: T, reason: unknown) {
    const { currentItem } = this;

    if (currentItem?.item === item) {
      currentItem.cancel?.();
      currentItem.reject(reason);
      currentItem.finished = true;
      this.runNextItem();
    } else {
      this.queue = this.queue.filter(({ item: queueItem }) => queueItem !== item);
    }
  }

  async runNextItem() {
    const currentItem = (this.currentItem = this.queue.shift());

    if (!currentItem) {
      return;
    }

    const { item, resolve, reject } = currentItem;

    try {
      const { result, cancel } = this.runItem(item);
      currentItem.cancel = cancel;
      const res = await result;

      if (currentItem.finished) return;

      resolve(res);
    } catch (e) {
      if (currentItem.finished) return;

      reject(e);
    } finally {
      if (!currentItem.finished) {
        currentItem.finished = true;

        this.runNextItem();
      }
    }
  }
}
