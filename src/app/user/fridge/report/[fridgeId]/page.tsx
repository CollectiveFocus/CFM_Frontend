'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { FeedbackCard } from 'components/atoms';
import { ReportForm, ReportFormData } from 'features/fridge-management';

enum DisplayStatus {
  Form = 0,
  Success = 1,
  Error = 2,
}

export default function FridgeReportPage(): React.ReactElement {
  const [displayStatus, setDisplayStatus] = useState<DisplayStatus>(
    DisplayStatus.Form
  );
  const params = useParams();
  const fridgeId = params.fridgeId as string;

  const postReportUrl = `${process.env.NEXT_PUBLIC_FF_API_URL}/v1/reports`;

  async function handleSubmit(values: ReportFormData) {
    try {
      const payload = {
        ...values,
        fridgeId,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(postReportUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setDisplayStatus(DisplayStatus.Success);
      } else {
        setDisplayStatus(DisplayStatus.Error);
      }
    } catch (error) {
      console.error('Failed to submit report:', error);
      setDisplayStatus(DisplayStatus.Error);
    }
  }

  function renderContent(): React.ReactNode {
    switch (displayStatus) {
      case DisplayStatus.Form:
        return <ReportForm fridgeId={fridgeId} onSubmit={handleSubmit} />;
      case DisplayStatus.Success:
        return (
          <FeedbackCard
            form="FridgeStatusSuccess"
            slug={`/fridge/${fridgeId}`}
          />
        );
      case DisplayStatus.Error:
        return (
          <FeedbackCard
            form="Error"
            slug={() => setDisplayStatus(DisplayStatus.Form)}
          />
        );
      default:
        return null;
    }
  }

  return <>{fridgeId && renderContent()}</>;
}
