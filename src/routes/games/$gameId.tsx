export const Route = createFileRoute('/games/$gameId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      gameId: params.gameId,
    };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error</div>,
});

function RouteComponent() {
  const { gameId } = Route.useLoaderData();

  return <div>Hello {gameId}!</div>;
}
