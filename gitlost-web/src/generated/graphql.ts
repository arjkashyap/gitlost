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
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  login: UserResponse;
  register: UserResponse;
};


export type MutationCreateProjectArgs = {
  input: ProjectInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  input: UsernamePasswordInput;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['String'];
  currentVersion: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  orignalPosterId: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  pullRequests: PullRequest;
  read: Scalars['Boolean'];
  starredByUsers?: Maybe<User>;
  updatedAt: Scalars['String'];
  write: Scalars['Boolean'];
};

export type ProjectInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  s3FileUrl: Scalars['String'];
};

export type PullRequest = {
  __typename?: 'PullRequest';
  accepts: Scalars['Float'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  from: User;
  id: Scalars['ID'];
  merged: Scalars['Boolean'];
  project: Project;
  s3FileUrl: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  views: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  project: Project;
  projects: Array<Project>;
  users: Array<User>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  starredProjects: Project;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: string, username: string, createdAt: string } | null } };


export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!) {
  register(input: {email: $email, username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
      createdAt
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};