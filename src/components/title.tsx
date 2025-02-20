export const Title = ({ desc, title }: { desc: string; title: string }) => (
  <div className='mb-4'>
    <h1 className='text-primary text-2xl font-bold sm:text-3xl lg:text-4xl'>
      {title}
    </h1>
    <p className='text-muted-foreground text-sm md:text-base lg:text-lg'>
      {desc}
    </p>
  </div>
);
