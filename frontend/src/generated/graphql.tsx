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
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Location = {
  __typename?: 'Location';
  address?: Maybe<Scalars['String']>;
  addressHidden?: Maybe<Scalars['Boolean']>;
  c_cateringURL?: Maybe<Scalars['String']>;
  c_comingSoonText?: Maybe<Scalars['String']>;
  c_infoBanner?: Maybe<Scalars['String']>;
  c_locationHighlights?: Maybe<Scalars['String']>;
  c_locationName?: Maybe<Scalars['String']>;
  c_locationShortName?: Maybe<Scalars['String']>;
  c_locationSlug?: Maybe<Scalars['String']>;
  c_mapTile?: Maybe<Scalars['String']>;
  c_mapUrl?: Maybe<Scalars['String']>;
  c_masthead?: Maybe<Scalars['String']>;
  c_oloID?: Maybe<Scalars['String']>;
  c_promoGraphic?: Maybe<Scalars['String']>;
  c_promoUrl?: Maybe<Scalars['String']>;
  c_shortDescription?: Maybe<Scalars['String']>;
  categoryIds?: Maybe<Scalars['String']>;
  cityCoordinate?: Maybe<Scalars['String']>;
  comingSoon?: Maybe<Scalars['Boolean']>;
  createdAd?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  displayCoordinate?: Maybe<Scalars['String']>;
  geocodedCoordinate?: Maybe<Scalars['String']>;
  hours?: Maybe<Scalars['String']>;
  hoursString?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  isoRegionCode?: Maybe<Scalars['String']>;
  localPhone?: Maybe<Scalars['String']>;
  mainPhone?: Maybe<Scalars['String']>;
  meta?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderUrl?: Maybe<Scalars['String']>;
  routableCoordinate?: Maybe<Scalars['String']>;
  timeZoneUtcOffset?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  visible?: Maybe<Scalars['Boolean']>;
  yextDisplayCoordinate?: Maybe<Scalars['String']>;
  yextId?: Maybe<Scalars['String']>;
  yextRoutableCoordinate?: Maybe<Scalars['String']>;
};

export type LocationInput = {
  address?: InputMaybe<Scalars['String']>;
  c_cateringURL?: InputMaybe<Scalars['String']>;
  c_comingSoonText?: InputMaybe<Scalars['String']>;
  c_locationHighlights?: InputMaybe<Scalars['String']>;
  c_locationName?: InputMaybe<Scalars['String']>;
  c_locationShortName?: InputMaybe<Scalars['String']>;
  c_locationSlug?: InputMaybe<Scalars['String']>;
  c_mapTile?: InputMaybe<Scalars['String']>;
  c_mapUrl?: InputMaybe<Scalars['String']>;
  c_masthead?: InputMaybe<Scalars['String']>;
  c_oloID?: InputMaybe<Scalars['String']>;
  c_promoGraphic?: InputMaybe<Scalars['String']>;
  c_promoUrl?: InputMaybe<Scalars['String']>;
  c_shortDescription?: InputMaybe<Scalars['String']>;
  comingSoon?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  geocodedCoordinate?: InputMaybe<Scalars['String']>;
  hours?: InputMaybe<Scalars['String']>;
  mainPhone?: InputMaybe<Scalars['String']>;
  orderUrl?: InputMaybe<Scalars['String']>;
  visible?: InputMaybe<Scalars['String']>;
  yextId?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLocation?: Maybe<Scalars['Boolean']>;
  changePassword?: Maybe<UserResponse>;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  login?: Maybe<UserResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  register?: Maybe<UserResponse>;
  updateComingSoon?: Maybe<Location>;
  updateVisibility?: Maybe<Location>;
};


export type MutationAddLocationArgs = {
  options?: InputMaybe<LocationInput>;
};


export type MutationChangePasswordArgs = {
  newPassword?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};


export type MutationForgotPasswordArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  password?: InputMaybe<Scalars['String']>;
  usernameOrEmail?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  options?: InputMaybe<UsernamePasswordInput>;
};


export type MutationUpdateComingSoonArgs = {
  input?: InputMaybe<UpdateComingSoonInput>;
};


export type MutationUpdateVisibilityArgs = {
  input?: InputMaybe<UpdateVisibleInput>;
};

export type Query = {
  __typename?: 'Query';
  location?: Maybe<Location>;
  locations?: Maybe<Array<Location>>;
  me?: Maybe<User>;
  teachers?: Maybe<Array<User>>;
};


export type QueryLocationArgs = {
  yextId?: InputMaybe<Scalars['String']>;
};

export type UpdateComingSoonInput = {
  comingSoon?: InputMaybe<Scalars['Boolean']>;
  yextId?: InputMaybe<Scalars['String']>;
};

export type UpdateVisibleInput = {
  visible?: InputMaybe<Scalars['Boolean']>;
  yextId?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type LocationSnippetFragment = { __typename?: 'Location', id?: number | null, c_oloID?: string | null, address?: string | null, description?: string | null, hours?: string | null, name?: string | null, c_cateringURL?: string | null, c_locationHighlights?: string | null, c_locationShortName?: string | null, c_locationSlug?: string | null, c_locationName?: string | null, c_mapTile?: string | null, c_promoGraphic?: string | null, c_masthead?: string | null, c_mapUrl?: string | null, visible?: boolean | null, comingSoon?: boolean | null, c_comingSoonText?: string | null, c_promoUrl?: string | null, c_shortDescription?: string | null, geocodedCoordinate?: string | null, mainPhone?: string | null, orderUrl?: string | null, yextId?: string | null, hoursString?: string | null };

export type AddLocationMutationVariables = Exact<{
  options: LocationInput;
}>;


export type AddLocationMutation = { __typename?: 'Mutation', addLocation?: boolean | null };

export type UpdateComingSoonMutationVariables = Exact<{
  input: UpdateComingSoonInput;
}>;


export type UpdateComingSoonMutation = { __typename?: 'Mutation', updateComingSoon?: { __typename?: 'Location', comingSoon?: boolean | null } | null };

export type UpdateVisibilityMutationVariables = Exact<{
  input: UpdateVisibleInput;
}>;


export type UpdateVisibilityMutation = { __typename?: 'Mutation', updateVisibility?: { __typename?: 'Location', visible?: boolean | null } | null };

export type LocationQueryVariables = Exact<{
  yextId: Scalars['String'];
}>;


export type LocationQuery = { __typename?: 'Query', location?: { __typename?: 'Location', id?: number | null, c_oloID?: string | null, address?: string | null, description?: string | null, hours?: string | null, name?: string | null, c_cateringURL?: string | null, c_locationHighlights?: string | null, c_locationShortName?: string | null, c_locationSlug?: string | null, c_locationName?: string | null, c_mapTile?: string | null, c_promoGraphic?: string | null, c_masthead?: string | null, c_mapUrl?: string | null, visible?: boolean | null, comingSoon?: boolean | null, c_comingSoonText?: string | null, c_promoUrl?: string | null, c_shortDescription?: string | null, geocodedCoordinate?: string | null, mainPhone?: string | null, orderUrl?: string | null, yextId?: string | null, hoursString?: string | null } | null };

export type LocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationsQuery = { __typename?: 'Query', locations?: Array<{ __typename?: 'Location', id?: number | null, c_oloID?: string | null, address?: string | null, description?: string | null, hours?: string | null, name?: string | null, c_cateringURL?: string | null, c_locationHighlights?: string | null, c_locationShortName?: string | null, c_locationSlug?: string | null, c_locationName?: string | null, c_mapTile?: string | null, c_promoGraphic?: string | null, c_masthead?: string | null, c_mapUrl?: string | null, visible?: boolean | null, comingSoon?: boolean | null, c_comingSoonText?: string | null, c_promoUrl?: string | null, c_shortDescription?: string | null, geocodedCoordinate?: string | null, mainPhone?: string | null, orderUrl?: string | null, yextId?: string | null, hoursString?: string | null }> | null };

export const LocationSnippetFragmentDoc = gql`
    fragment LocationSnippet on Location {
  id
  c_oloID
  address
  description
  hours
  name
  c_cateringURL
  c_locationHighlights
  c_locationShortName
  c_locationSlug
  c_locationName
  c_mapTile
  c_promoGraphic
  c_masthead
  c_mapUrl
  visible
  comingSoon
  c_comingSoonText
  c_promoUrl
  c_shortDescription
  geocodedCoordinate
  mainPhone
  orderUrl
  yextId
  hoursString
}
    `;
export const AddLocationDocument = gql`
    mutation AddLocation($options: LocationInput!) {
  addLocation(options: $options)
}
    `;

export function useAddLocationMutation() {
  return Urql.useMutation<AddLocationMutation, AddLocationMutationVariables>(AddLocationDocument);
};
export const UpdateComingSoonDocument = gql`
    mutation updateComingSoon($input: UpdateComingSoonInput!) {
  updateComingSoon(input: $input) {
    comingSoon
  }
}
    `;

export function useUpdateComingSoonMutation() {
  return Urql.useMutation<UpdateComingSoonMutation, UpdateComingSoonMutationVariables>(UpdateComingSoonDocument);
};
export const UpdateVisibilityDocument = gql`
    mutation UpdateVisibility($input: UpdateVisibleInput!) {
  updateVisibility(input: $input) {
    visible
  }
}
    `;

export function useUpdateVisibilityMutation() {
  return Urql.useMutation<UpdateVisibilityMutation, UpdateVisibilityMutationVariables>(UpdateVisibilityDocument);
};
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