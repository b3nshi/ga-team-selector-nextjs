import { Box, Button, DataTable, Layer, Meter, Select } from 'grommet';
import * as Icons from 'grommet-icons';
import { useState } from 'react';
import { FixedButton } from '../../../components/FixedButton';
import { useCollection } from 'react-firebase-hooks/firestore';

import styles from './Settings.module.css';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase';
import {
  GAME_TYPES,
  mapUserGamesToDTO,
  UserGame,
  USER_GAMES_COLLECTION,
} from '../../../models/userGames';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Settings = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [credentials] = useAuthState(auth);

  const [value, loading, error] = useCollection(
    collection(db, USER_GAMES_COLLECTION),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const showAddPopup = () => {
    setShowAdd(true);
  };
  const closeAddPopup = () => setShowAdd(false);
  const addNewGame = async (e) => {
    e.preventDefault();

    await addDoc(
      collection(db, USER_GAMES_COLLECTION),
      new UserGame(credentials.uid, selectValue, 5).toDTO()
    );
    setSelectValue('');
    setShowAdd(false);
  };

  console.log(value);
  console.log(value && mapUserGamesToDTO(value.docs));

  return (
    <Box direction="column" justify="start">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <DataTable
          columns={[
            {
              property: 'gameType',
              header: 'Game Type',
              primary: true,
            },
            {
              property: 'score',
              header: 'Score',
              render: (datum) => (
                <Box pad={{ vertical: 'xsmall' }}>
                  <Meter
                    values={[{ value: datum.score }]}
                    thickness="small"
                    size="small"
                    max={10}
                  />
                </Box>
              ),
            },
          ]}
          data={value ? mapUserGamesToDTO(value.docs) : []}
        />
      )}
      {showAdd ? (
        <Layer onEsc={closeAddPopup} onClickOutside={closeAddPopup}>
          <Box direction="column">
            <form onSubmit={addNewGame}>
              <Box direction="column" justify="between" className={styles.form}>
                <Select
                  options={Object.keys(GAME_TYPES)}
                  value={selectValue}
                  onChange={({ option }) => setSelectValue(option)}
                />
                <Button icon={<Icons.Add />} label="Add game" type="submit" />
              </Box>
            </form>
          </Box>
        </Layer>
      ) : null}
      <FixedButton onClick={showAddPopup} />
    </Box>
  );
};
