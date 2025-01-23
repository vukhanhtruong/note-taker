import "reflect-metadata";
import { container } from "tsyringe";

afterAll(() => {
  container.clearInstances();
  container.reset();
});
