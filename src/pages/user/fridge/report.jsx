import { useState } from 'react';

import { FridgeReport } from 'components/organisms/dialog/FridgeReport';
import { FeedbackCard } from 'components/atoms';

export default function FridgeReportPage() {
  const [reportSubmitted, setReportSubmitted] = useState(false);

  return (
    <div>
      {reportSubmitted ? (
        <FeedbackCard type={'ReportStatus'} />
      ) : (
        <FridgeReport
          fridgeName="Cooper Park Community Fridge"
          fridgeId="lescommunityfridge"
          setReportSubmitted={setReportSubmitted}
        />
      )}
    </div>
  );
}
