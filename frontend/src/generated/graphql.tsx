import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  address: Scalars['String'];
  addressHidden: Scalars['Boolean'];
  c_cateringURL: Scalars['String'];
  c_infoBanner: Scalars['String'];
  c_locationHighlights: Scalars['String'];
  c_locationName: Scalars['String'];
  c_locationShortName: Scalars['String'];
  c_locationSlug: Scalars['String'];
  c_mapTile: Scalars['String'];
  c_mapUrl: Scalars['String'];
  c_oloID: Scalars['String'];
  c_promoUrl: Scalars['String'];
  c_shortDescription: Scalars['String'];
  categoryIds: Scalars['String'];
  cityCoordinate: Scalars['String'];
  createdAd: Scalars['DateTime'];
  description: Scalars['String'];
  displayCoordinate: Scalars['String'];
  geocodedCoordinate: Scalars['String'];
  hours: Scalars['String'];
  id: Scalars['Int'];
  isoRegionCode: Scalars['String'];
  localPhone: Scalars['String'];
  mainPhone: Scalars['String'];
  meta: Scalars['String'];
  name: Scalars['String'];
  orderUrl: Scalars['String'];
  routableCoordinate: Scalars['String'];
  timeZoneUtcOffset: Scalars['String'];
  timezone: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  yextDisplayCoordinate: Scalars['String'];
  yextId: Scalars['String'];
  yextRoutableCoordinate: Scalars['String'];
};

export type LocationInput = {
  hours: Scalars['String'];
};

export type LocationResponse = {
  __typename?: 'LocationResponse';
  location: Array<Location>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLocation: LocationResponse;
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationAddLocationArgs = {
  options: LocationInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  location: Location;
  locations?: Maybe<Array<Location>>;
  me?: Maybe<User>;
  teachers?: Maybe<Array<User>>;
};


export type QueryLocationArgs = {
  yextId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  lastName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LocationSnippetFragment = { __typename?: 'Location', address: string, description: string, hours: string, name: string, c_cateringURL: string, c_infoBanner: string, c_locationHighlights: string, c_locationName: string, c_locationShortName: string, c_locationSlug: string, c_mapTile: string, c_mapUrl: string, c_oloID: string, c_promoUrl: string, c_shortDescription: string, geocodedCoordinate: string, mainPhone: string, orderUrl: string };

export type LocationQueryVariables = Exact<{
  yextId: Scalars['String'];
}>;


export type LocationQuery = { __typename?: 'Query', location: { __typename?: 'Location', address: string, description: string, hours: string, name: string, c_cateringURL: string, c_infoBanner: string, c_locationHighlights: string, c_locationName: string, c_locationShortName: string, c_locationSlug: string, c_mapTile: string, c_mapUrl: string, c_oloID: string, c_promoUrl: string, c_shortDescription: string, geocodedCoordinate: string, mainPhone: string, orderUrl: string } };

export type LocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationsQuery = { __typename?: 'Query', locations?: Array<{ __typename?: 'Location', address: string, description: string, hours: string, name: string, c_cateringURL: string, c_infoBanner: string, c_locationHighlights: string, c_locationName: string, c_locationShortName: string, c_locationSlug: string, c_mapTile: string, c_mapUrl: string, c_oloID: string, c_promoUrl: string, c_shortDescription: string, geocodedCoordinate: string, mainPhone: string, orderUrl: string }> | null };

export const LocationSnippetFragmentDoc = gql`
    fragment LocationSnippet on Location {
  address
  description
  hours
  name
  c_cateringURL
  c_infoBanner
  c_locationHighlights
  c_locationName
  c_locationShortName
  c_locationSlug
  c_mapTile
  c_mapUrl
  c_oloID
  c_promoUrl
  c_shortDescription
  geocodedCoordinate
  mainPhone
  orderUrl
}
    `;
export const LocationDocument = gql`
    query Location($yextId: String!) {
  location(yextId: $yextId) {
    ...LocationSnippet
  }
}
    ${LocationSnippetFragmentDoc}`;

export function useLocationQuery(options: Omit<Urql.UseQueryArgs<LocationQueryVariables>, 'query'>) {
  return Urql.useQuery<LocationQuery>({ query: LocationDocument, ...options });
};
export const LocationsDocument = gql`
    query Locations {
  locations {
    ...LocationSnippet
  }
}
    ${LocationSnippetFragmentDoc}`;

export function useLocationsQuery(options?: Omit<Urql.UseQueryArgs<LocationsQueryVariables>, 'query'>) {
  return Urql.useQuery<LocationsQuery>({ query: LocationsDocument, ...options });
};