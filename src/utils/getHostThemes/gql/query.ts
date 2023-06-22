import { gql } from "graphql-request";

export const GET_THEME = gql`
  query getTheme($host: String!) {
    results: getTheme(host: $host) {
      name
      border {
        width
        radius
      }
      colors {
        primary {
          lightest
          lighter
          light
          DEFAULT
          dark
          darker
          darkest
        }
        secondary {
          lightest
          lighter
          light
          DEFAULT
          dark
          darker
          darkest
        }
        success {
          lightest
          lighter
          light
          DEFAULT
          dark
          darker
          darkest
        }
        warning {
          lightest
          lighter
          light
          DEFAULT
          dark
          darker
          darkest
        }
        danger {
          lightest
          lighter
          light
          DEFAULT
          dark
          darker
          darkest
        }
        light {
          lightest
          lighter
          light
          DEFAULT
          dark
          darker
          darkest
        }
        dark {
          lightest
          lighter
          light
          DEFAULT
          dark
          darker
          darkest
        }
      }
      font {
        URL
        family
        size {
          xs {
            fontSize
            fontWeight
          }
          sm {
            fontSize
            fontWeight
          }
          md {
            fontSize
            fontWeight
          }
          lg {
            fontSize
            fontWeight
          }
          xl {
            fontSize
            fontWeight
          }
        }
      }
      dimensions {
        xs {
          width
          height
          containerHeight
        }
        sm {
          width
          height
          containerHeight
        }
        md {
          width
          height
          containerHeight
        }
        lg {
          width
          height
          containerHeight
        }
        xl {
          width
          height
          containerHeight
        }
        full {
          width
          height
          containerHeight
        }
      }
    }
  }
`;

export const GET_MEMBERS_TABLE = gql`
  query membersTable {
    results: membersTable {
      columns {
        Header
        accessor
      }
      data {
        fullName
        email
        ratings
        trainingCompleted
        tasks
      }
    }
  }
`;

export const GET_HOST_CONFIG = gql`
  query getUXConfig {
    results: getUXConfig {
      address {
        value
      }
      trainingCompleted {
        value
      }
      reportsTo {
        value
      }
      joined {
        value
      }
      ratings {
        value
      }
      email {
        value
      }
      fullName {
        value
      }
      suburb {
        value
      }
      country {
        value
      }
      state {
        value
      }
      city {
        value
      }
      lastName {
        value
      }
      firstName {
        value
      }
      employeeId {
        value
      }
    }
  }
`;
