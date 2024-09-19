
export function UsersSkeleton() {
  const arrayOfFakeUsers = new Array(6)
  return (
    <div>
      {arrayOfFakeUsers.map((item, index) => (
        <div key={index} className='flex flex-col'>
          <div className="rounded-full object-cover size-20 bg-FondoPrimary animate-pulse" />
          <div className='bg-FondoPrimary w-12 h-6' />
        </div>
      ))}
    </div>
  );
}

