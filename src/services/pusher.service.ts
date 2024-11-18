import Pusher from "pusher-js";

const PUSHER_KEY = "a33d6e88205bf895b7de";
const PUSHER_CLUSTER = "ap1";

export class PusherService {
  private static instance: PusherService | null = null;
  private pusher: Pusher;
  private currentChannel: string | null = null;

  constructor() {
    this.pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
    });
  }

  static getInstance(): PusherService {
    if (!this.instance) {
      this.instance = new PusherService();
    }
    return this.instance;
  }
  subscribeToChannel(channelName: string, event: string, callback: (data: any) => void) {
    if (this.currentChannel) {
      this.unsubscribeFromChannel(this.currentChannel);
    }
    const channel = this.pusher.subscribe(channelName);
    channel.bind(event, callback);
    this.currentChannel = channelName;
  }

  unsubscribeFromChannel(channelName: string) {
    if (this.currentChannel === channelName) {
      this.pusher.unsubscribe(channelName);
      this.currentChannel = null;
    }
  }

  disconnect() {
    this.pusher.disconnect();
  }
}
