import { User } from "./user";
import { Vote } from "./vote";

export class Quotes {
  constructor(
    public id = 0,
    public content = "",
    public date_time = "",
    public karma = "",
    public author_id = "",
    public vote = new Vote(),
    public author = new User()
  ) {}
}
