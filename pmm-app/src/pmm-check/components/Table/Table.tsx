import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@grafana/ui';
import { Column, ActiveCheck } from 'pmm-check/types';
import { PMM_SETTINGS_URL } from 'pmm-check/CheckPanel.constants';
import { getStyles } from './Table.styles';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

interface TableProps {
  caption?: string;
  columns: Column[];
  data?: ActiveCheck[];
  isSttEnabled: boolean;
}

export const Table: FC<TableProps> = ({ caption, columns, data = [], isSttEnabled }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const isEmpty = !data.length;

  return (
    <>
      {caption && (
        <div className={styles.caption} data-qa="db-check-panel-table-caption">
          {caption}
        </div>
      )}
      <div className={styles.wrapper}>
        {!isSttEnabled && (
          <div className={styles.empty} data-qa="db-check-panel-settings-link">
            Security Threat Tool is disabled. You can enable it in&nbsp;
            <Link className={styles.link} to={PMM_SETTINGS_URL}>
              PMM Settings.
            </Link>
          </div>
        )}
        {isSttEnabled && isEmpty && (
          <div className={styles.empty} data-qa="db-check-panel-table-empty">
            No data.
          </div>
        )}
        {isSttEnabled && !isEmpty && (
          <table className={styles.table} data-qa="db-check-panel-table">
            <TableHeader columns={columns} />
            <TableBody data={data} />
          </table>
        )}
      </div>
    </>
  );
};
