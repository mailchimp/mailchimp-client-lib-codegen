# CONFIG OPTIONS — PHP

        sortParamsByRequiredFlag
            Sort method arguments to place required parameters before optional parameters. (Default: true)

        ensureUniqueParams
            Whether to ensure parameter names are unique in an operation (rename parameters that are not). (Default: true)

        allowUnicodeIdentifiers
            boolean, toggles whether unicode identifiers are allowed in names or not, default is false (Default: false)

        modelPackage
            package for generated models

        apiPackage
            package for generated api classes

        variableNamingConvention
            naming convention of variable name, e.g. camelCase. (Default: snake_case)

        invokerPackage
            The main namespace to use for all classes. e.g. Yay\Pets

        packagePath
            The main package name for classes. e.g. GeneratedPetstore

        srcBasePath
            The directory under packagePath to serve as source root.

        composerVendorName
            The vendor name used in the composer package name. The template uses {{composerVendorName}}/{{composerProjectName}} for the composer package name. e.g. yaypets. IMPORTANT NOTE (2016/03): composerVendorName will be deprecated and replaced by gitUserId in the next swagger-codegen release

        gitUserId
            Git user ID, e.g. swagger-api.

        composerProjectName
            The project name used in the composer package name. The template uses {{composerVendorName}}/{{composerProjectName}} for the composer package name. e.g. petstore-client. IMPORTANT NOTE (2016/03): composerProjectName will be deprecated and replaced by gitRepoId in the next swagger-codegen release

        gitRepoId
            Git repo ID, e.g. swagger-codegen.

        artifactVersion
            The version to use in the composer package version field. e.g. 1.2.3

        hideGenerationTimestamp
            boolean, toggles whether unicode identifiers are allowed in names or not, default is false (Default: true)
