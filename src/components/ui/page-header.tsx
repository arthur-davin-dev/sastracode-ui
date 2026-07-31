interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-main-title font-bold text-indigo-950">{title}</h1>
      {description && (
        <p className="text-content text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}