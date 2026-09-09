import type { ComponentProps, ComponentType } from "react";
import {
  Braces,
  Cloud,
  Code2,
  Container,
  Database,
  GitBranch,
  Gauge,
  Layers3,
  Search,
  Server,
  Terminal,
  Workflow,
} from "lucide-react";

type TechIconComponent = ComponentType<ComponentProps<typeof Code2>>;

const icons: Record<string, TechIconComponent> = {
  Python: Braces,
  SQL: Database,
  "C++": Code2,
  Django: Server,
  "Django REST Framework": Workflow,
  FastAPI: ZapIcon,
  PostgreSQL: Database,
  MySQL: Database,
  Redis: Layers3,
  "AWS Athena": Cloud,
  "AWS S3": Cloud,
  OpenSearch: Search,
  AWS: Cloud,
  Docker: Container,
  Linux: Terminal,
  "SQL Optimization": Gauge,
  "Asynchronous Workflows": Workflow,
  "Message Queues": Workflow,
  "Task Scheduling": GitBranch,
  "System Design": Layers3,
  "Distributed Systems": Server,
  "REST APIs": Workflow,
  "Data Structures & Algorithms": Code2,
  "Next.js": Code2,
  "GitHub Actions": GitBranch,
  "Claude API": Braces,
};

function ZapIcon(props: ComponentProps<typeof Code2>) {
  return <Gauge {...props} />;
}

export default function TechIcon({ name, size = 16 }: { name: string; size?: number }) {
  const Icon = icons[name] ?? Code2;
  return <Icon size={size} strokeWidth={1.7} aria-hidden="true" />;
}
