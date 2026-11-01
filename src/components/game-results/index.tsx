import { Title } from '@/components/title';
import { RecordResultForm } from './record-result-form';

export function RecordResult() {
  return (
    <>
      <Title
        title='Record Result'
        desc='Enter the game details, final standings, payouts, and bounties.'
      />
      <RecordResultForm />
    </>
  );
}
