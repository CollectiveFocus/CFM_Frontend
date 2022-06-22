import { DialogUpdateFridgeStatus } from 'components/organisms';
import { Backtrack } from 'components/molecules';

export default function UpdateFridgeStatus() {
  return (
    <div>
      <Backtrack />
      <DialogUpdateFridgeStatus fridgeName="Cooper Park Community Fridge" />
    </div>
  );
}
