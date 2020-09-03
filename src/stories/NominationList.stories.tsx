import React from 'react';
import NominationList, { NominationListProps } from '../components/NominationList';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { ITitleData } from '../types/Title';
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from '@shopify/polaris';

export default {
  title: 'Components/NominationList',
  component: NominationList,
} as Meta;

const Template = (props: NominationListProps) => (
  <AppProvider i18n={enTranslations}>
    <NominationList {...props} />
  </AppProvider>
);

export const EmptyNominationList = () =>
  <Template
    nominations={[]}
    setNominations={action}
  />;

const nominations: ITitleData[] = [
  {
    Poster: '',
    Title: 'The Terminator',
    Type: 'Action',
    Year: '1994',
    imdbID: 'https://somelink'
  }
];

export const LegendaryNominationList = () =>
  <Template
    nominations={nominations}
    setNominations={action}
  />;